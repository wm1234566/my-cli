const download=require("download-git-repo")

download('direct:https://gitee.com/beiyaoyaoyao/express-template.git', 'test/tmp',{ clone: true }, function (err) {
  console.log(err ? 'Error' : 'Success')
})
