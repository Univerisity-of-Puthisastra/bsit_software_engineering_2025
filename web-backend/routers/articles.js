const { PrismaClient } = require("@prisma/client");
const authMiddleWare = require("../middleware/auth");
const articleRoutes = require("express").Router();
const prisma = new PrismaClient();

articleRoutes.get("/", async (req, res) => {
  const articles = await prisma.article.findMany({ include: { author: true } });
  res.send(articles);
});
articleRoutes.get("/:articleId", async (req, res) => {
  const { articleId } = req.params || {};
  console.log({ articleId });
  const foundArticle = await prisma.article.findUnique({
    where: { id: parseInt(articleId) },
    include: { author: true },
  });
  if (foundArticle) res.send(foundArticle);
  else {
    res.status(404).send({ message: "not found" });
  }
});

articleRoutes.post("/", authMiddleWare, async (req, res) => {
  console.log("Request body", req.user);
  const { title, description, imageUrl } = req.body || {};

  if (title && description && imageUrl) {
    const createdArticle = await prisma.article.create({
      data: { title, description, imageUrl, authorId: req.user.id },
    });
    res.status(201).send(createdArticle);
  } else {
    res.status(400).send({ message: "Bad Request" });
  }
});

module.exports = articleRoutes;
