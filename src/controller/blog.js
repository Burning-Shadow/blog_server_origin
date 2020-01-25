const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: "标题A",
      content: "内容A",
      author: "zhangsan",
      createTime: 1579953243714
    },
    {
      id: 2,
      title: "标题B",
      content: "内容B",
      author: "lisi",
      createTime: 1579953304735
    },
    {
      id: 3,
      title: "标题C",
      content: "内容C",
      author: "WANGWU",
      createTime: 1579953314819
    }
  ];
};

const getDetail = id => {
  return {
    id: 1,
    title: "标题C",
    content: "内容C",
    author: "WANGWU",
    createTime: 1579953314819
  };
};

const newBlog = blogData => {
  // 博客对象，包含 title content
  // TODO: 假数据，递增 id
  return {
    id: 4
  };
};

const updateBlog = (id, blogData = {}) => {
  // TODO: 假数据
  console.log(`update blog --- id = ${id}, blogData = ${blogData}`);
  return true;
};

const delBlog = id => {
  return true;
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};
