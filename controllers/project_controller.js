const project = require("../db/models/project");
const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsyncError");

const createProject = catchAsync(async (req, res, next) => {
    const body = req.body;
    const userId = req.user.id;

    const newProject = await project.create({
        title: body.title,
        productImage: body.productImage,
        price: body.price,
        shortDescription: body.shortDescription,
        description: body.description,
        productUrl: body.productUrl,
        category: body.category,
        tags: body.tags,
        createdBy: userId,
    });

    return res.status(201).json({
        status: "success",
        data: newProject,
    });
});

const getAllProjects = catchAsync(async (req, res, next) => {
    const result = await project.findAll({include: user});

    return res.json({
        status: "success",
        data: result,
    });
});

const getProjectById = catchAsync(async (req, res, next) => {
    const projectId = req.params.id;
    const result = await project.findByPk(projectId);

    if(!result){
        return next(new AppError("Invalid project Id", 400));
    }

    return res.json({
        status: "success",
        data: result,
    });
})

const updateProject = catchAsync(async (req, res, next) => {
    const projectId = req.params.id;
    const userId = req.user.id["id"];
    const body = req.body;

    const result = await project.findByPk(projectId, )

    if(!result){
        return next(new AppError("Invalid project Id", 400));
    }

    result.title = body.title;
    result.price = body.price;
    result.shortDescription = body.shortDescription;
    result.description = body.description;
    result.productUrl = body.productUrl;
    result.category = body.category;
    result.tags = body.tags;

    const updatedResult = await result.save();

    return res.json({
        status: "success",
        data: updatedResult,
    });
});

module.exports = { createProject, getAllProjects, getProjectById, updateProject }