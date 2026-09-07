//  buils and read file paths
import path from "node:path";
// const filePath = projectRoot + "/uploads" + filename
// path.join : uses the correct separator for the correct os 
// c:users/AMAN/project/File.txt 
// process.cwd: the folder where the node js process was started 

const projectRoot = process.cwd();
console.log(projectRoot);

// /uploads/users/42/profile.photo.png

const userId = "42"
const originalName = "profile.photo.png"
// imp -> path.join -> create a path string
// it will not create the folder
// it does not check whether the file exist or not 
const uploadFilePath = path.join(
    projectRoot, "uploads", "users", userId, originalName
)
console.log(uploadFilePath);

// final part of a path
const fileName = path.basename(uploadFilePath);
const fileExt = path.extname(uploadFilePath);
const parentFolder = path.dirname(uploadFilePath)
console.log(fileName , fileExt, parentFolder);