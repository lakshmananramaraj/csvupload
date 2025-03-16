const { parentPort, workerData } = require("worker_threads");
const userModel = require("../models/user");
const policyCategoryModel = require("../models/policyCategory");
const policyCarrierModel = require("../models/policyCarrier");
const policyInfoModel = require("../models/policyInfo");
const agentModel = require("../models/agent");
const userAccountModel = require("../models/userAccount");
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const xlsx = require("xlsx");
const { default: mongoose } = require("mongoose");
const filePath = workerData.filePath;

//mongoDB connection for Worker Thread
mongoose.connect(
  "provide your mongoDB url"
);

async function processFile() {
  const ext = path.extname(filePath);
  let records = [];

  if (ext === ".csv") {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => records.push(row))
      .on("end", async () => {
        await saveToDatabase(records);
      });
  } else if (ext === ".xlsx") {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    records = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    await saveToDatabase(records);
  }
}

async function saveToDatabase(data) {
  for (const row of data) {
    var user = await userModel.findOne({ firstName: row["firstname"] });

    if (!user) {
      user = await userModel.create({
        firstName: row["firstname"],
        dob: row["dob"],
        address: row["address"],
        phone: row["phone"],
        state: row["state"],
        zipCode: row["zip"],
        email: row["email"],
        gender: row["gender"],
        userType: row["userType"],
      });
    }

    var policyCategory = await policyCategoryModel.findOne({
      categoryName: row["category_name"],
    });
    if (!policyCategory) {
      policyCategory = await policyCategoryModel.create({
        categoryName: row["category_name"],
      });
    }

    var agent = await agentModel.findOne({ agentName: row["agent"] });
    if (!agent) {
      agent = await agentModel.create({ agentName: row["agent"] });
    }
    var userAccount = await userAccountModel.findOne({
      accountName: row["account_name"],
    });
    if (!userAccount) {
      userAccount = await userAccountModel.create({
        accountName: row["account_name"],
      });
    }
    var policyCarrier = await policyCarrierModel.findOne({
      companyName: row["company_name"],
    });

    if (!policyCarrier) {
      policyCarrier = await policyCarrierModel.create({
        companyName: row["company_name"],
      });
    }

    await policyInfoModel.create({
      policyNumber: row["policy_number"],
      policyStartDate: row["policy_start_date"],
      policyEndDate: row["policy_end_date"],
      categoryId: policyCategory._id,
      companyId: policyCarrier._id,
      userId: user._id,
    });
  }
  parentPort.postMessage("File uploaded successfully");
}

processFile().catch((error) =>
  parentPort.postMessage(`Error: ${error.message}`)
);
