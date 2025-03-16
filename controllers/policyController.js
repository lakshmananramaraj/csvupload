const path = require("path");
const policyInfoModel = require("../models/policyInfo");
const userModel = require("../models/user");
const { Worker } = require("worker_threads");

class policy {
  async postUploadCsv(req, res) {
    const worker = new Worker(path.join(__dirname, "worker.js"), {
      workerData: { filePath: req.file.path },
    });

    worker.on("message", (message) => {
      res.json({ message });
    });

    worker.on("error", (error) => {
      res.status(500).json({ error: error.message });
    });
  }

  async getByUserName(req, res) {
    try {
      const user = await userModel.findOne({ firstName:{ $regex: req.params.username, $options: "i" }  });
      if (!user) return res.status(404).json({ message: "User not found" });

      const policies = await policyInfoModel.find({ userId: user._id });
      res.json({ user, policies });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllPolicies(req, res) {
    try {
      const policyData = await policyInfoModel.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: {
            'path': '$user'
          }
        },
        {
          $lookup: {
            from: "policycarriers",
            localField: "companyId",
            foreignField: "_id",
            as: "policycarriers",
          },
        },
        {
          $unwind: {
            'path': '$policycarriers'
          }
        },
        {
          $lookup: {
            from: "policycategories",
            localField: "categoryId",
            foreignField: "_id",
            as: "policycategories",
          },
        },
        {
          $unwind: {
            'path': '$policycategories'
          }
        },
      ]);
      res.json(policyData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const policyController = new policy();
module.exports = policyController;
