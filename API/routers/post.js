const express = require('express');
const router = express.Router();
const db = require('../config/db');

// VARIABLES POR URL --> req.params
// VARIABLES POR BODY --> req.body

router.post('/add', async (req, res) => {

	const required = ["title","author"];
	
	// Comprobamos que estén todos los campos obligatorios
	const security = required.find((e)=>{
		if( req.body[e] === undefined ){ return true; }
	})

	if( security !== undefined){
		return res.json(`Falta el campo ${security}`);
	}

	const obj = {
		title: req.body.title,
		author: req.body.author
	};
	const result = await db('post').insert(obj);
	res.json("AÑADIMOS POST "+req.body.title);
});

router.put('/edit/:id',async (req, res) => {

	const result = await db('post')
	.update({
		title: req.body.title,
		author: req.body.author
	})
	.where("ID", req.params.id);

	res.json({ status: true });
	res.json("EDITAMOS POST "+req.params.id);
});

router.delete('/delete/:id', async (req, res) => {
	
	await db('post')
	.where('ID', req.params.id)
	.delete();

	res.json({status:true});
	res.json("BORRAMOS POST "+req.params.id);
});

router.get('/select/:id', async (req, res) => {

	const resultado = await db
	.select("*")
	.from('post')
	.where("ID", req.params.id);

	if(resultado.length === 0){
		res.status(400).json({
			status: false,
			error: "No existe el ID indicado"
		})
	}else{
		res.json({
			status: true,
			data: resultado[0]
		});
	}
	res.json("SELECCIONAMOS POST "+req.params.id);
});

router.get('/list', async (req, res) => {

	const resultado = await db
	.select("*")
	.from('post');

	res.json({
		status: true,
		data: resultado
	});
	res.json("SELECCIONAMOS VARIOS POSTS "+req.params.id);
});

module.exports = router;