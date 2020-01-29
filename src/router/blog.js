const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  if (method === "GET" && req.path === "/api/blog/list") {
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    const result = getList(author, keyword);

    return result.then(listData => {
      return new SuccessModel(listData);
    });
  } else if (method === "GET" && req.path === "/api/blog/detail") {
    const id = req.query.id;
    const result = getDetail(id);

    return result.then(data => {
      return new SuccessModel(data);
    });
  } else if (method === "POST" && req.path === "/api/blog/new") {
    // TODO: 登陆后方可新建博客。此时 author 从后台直接取即可，目前使用假数据，日后更改
    req.body.author = "testAuthor";
    const result = newBlog(req.body);

    return result.then(data => {
      return new SuccessModel(data);
    });
  } else if (method === "POST" && req.path === "/api/blog/update") {
    const result = updateBlog(id, req.body);

    return result.then(val => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel("博客更新失败");
      }
    });
  } else if (method === "POST" && req.path === "/api/blog/delete") {
    // TODO: 用户名暂且使用虚假数据，删除时只能删除自己的文章
    const author = "falseAuthor";
    const result = delBlog(id,author);

    return result.then(val => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel("删除博客失败");
      }
    });
  }
};

module.exports = handleBlogRouter;
