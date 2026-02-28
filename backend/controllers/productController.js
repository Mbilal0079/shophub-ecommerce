import Product from '../models/Product.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { AppError } from '../middleware/errorHandler.js';
import { uploadImage, deleteImage } from '../config/cloudinary.js';

// @desc    Get all products with filtering, sorting, and pagination
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res, next) => {
  // Copy req.query
  const queryObj = { ...req.query };

  // Fields to exclude from filtering
  const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
  excludedFields.forEach((field) => delete queryObj[field]);

  // Advanced filtering (gte, gt, lte, lt)
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  let query = Product.find(JSON.parse(queryStr));

  // Search functionality
  if (req.query.search) {
    query = query.find({
      $or: [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ]
    });
  }

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt'); // Default: newest first
  }

  // Field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 12;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  // Execute query
  const products = await query.populate('user', 'name email');

  // Get total count for pagination
  const total = await Product.countDocuments(JSON.parse(queryStr));

  res.status(200).json({
    success: true,
    count: products.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    data: products
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  // Handle image uploads if provided
  if (req.body.images && req.body.images.length > 0) {
    const uploadedImages = [];

    for (const image of req.body.images) {
      // Check if image is already an object with url and public_id
      if (typeof image === 'object' && image.url && image.public_id) {
        // Image is already in correct format
        uploadedImages.push({
          public_id: image.public_id,
          url: image.url
        });
      } else if (typeof image === 'string') {
        // Image is a string (either base64 or URL)
        if (image.startsWith('data:image')) {
          // Base64 image - upload to Cloudinary
          const uploadedImage = await uploadImage(image);
          uploadedImages.push(uploadedImage);
        } else {
          // External URL - store as is
          uploadedImages.push({ public_id: 'external', url: image });
        }
      }
    }

    req.body.images = uploadedImages;
  }

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  // Handle image updates
  if (req.body.images && req.body.images.length > 0) {
    // Delete old images from cloudinary
    for (const image of product.images) {
      if (image.public_id !== 'external') {
        await deleteImage(image.public_id);
      }
    }

    // Upload new images
    const uploadedImages = [];
    for (const image of req.body.images) {
      // Check if image is already an object with url and public_id
      if (typeof image === 'object' && image.url && image.public_id) {
        uploadedImages.push({
          public_id: image.public_id,
          url: image.url
        });
      } else if (typeof image === 'string') {
        if (image.startsWith('data:image')) {
          const uploadedImage = await uploadImage(image);
          uploadedImages.push(uploadedImage);
        } else {
          uploadedImages.push({ public_id: 'external', url: image });
        }
      }
    }

    req.body.images = uploadedImages;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  // Delete images from cloudinary
  for (const image of product.images) {
    if (image.public_id !== 'external') {
      await deleteImage(image.public_id);
    }
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
    data: {}
  });
});

// @desc    Create product review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  // Check if user already reviewed
  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user.id.toString()
  );

  if (alreadyReviewed) {
    throw new AppError('You have already reviewed this product', 400);
  }

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;

  // Calculate average rating
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();

  res.status(201).json({
    success: true,
    message: 'Review added successfully'
  });
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({ isActive: true })
    .sort({ ratings: -1 })
    .limit(5);

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({ featured: true, isActive: true })
    .limit(10);

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});