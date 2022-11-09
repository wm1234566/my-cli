const  ora=require("ora");
const spinner=ora().start();
spinner.text="loading..."
setTimeout(()=>{
  console.log("111")
  spinner.succeed("结束")
  spinner.info("消息")
  spinner.fail("失败")

},3000)
