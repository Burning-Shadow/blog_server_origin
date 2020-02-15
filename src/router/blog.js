const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

// 登陆验证
const loginCheck = req => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel("尚未登陆"));
  }
};

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

    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheck;
    }

    req.body.author = req.session.username;
    const result = newBlog(req.body);

    return result.then(data => {
      return new SuccessModel(data);
    });
  } else if (method === "POST" && req.path === "/api/blog/update") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheck;
    }

    const result = updateBlog(id, req.body);

    return result.then(val => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel("博客更新失败");
      }
    });
  } else if (method === "POST" && req.path === "/api/blog/delete") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheck;
    }

    const author = req.session.username;
    const result = delBlog(id, author);

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
