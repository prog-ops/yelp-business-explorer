import {
  searchProduk,
  getProdukList,
  getProdukById,
  addProduk,
  editProduk,
  removeProduk
} from "../controller/ProdukController.js";
import express from "express";

const router = express.Router()

// /produk/search
router.get('/produk/search', searchProduk)

// /produk
router.get('/produk', getProdukList)
router.post('/produk', addProduk)

// /produk/:id
router.get('/produk/:id', getProdukById)
router.patch('/produk/:id', editProduk) // patch itu update sebagian, sedangkan put ganti total
router.delete('/produk/:id', removeProduk)

export default router;
