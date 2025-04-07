const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const sum = (accumulated, currentBlogPost) => {
    return accumulated + currentBlogPost.likes;
  };

  return blogs.reduce(sum, 0);
};

const favoriteBlog = (blogs) => {
  const max = (previous, current) => {
    return previous.likes >= current.likes ? previous : current;
  };

  return blogs.reduce(max, blogs[0]);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
