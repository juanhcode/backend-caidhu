const {Router} = require('express');
const router = Router();
const pool = require('../databases/databases');
const {isLoggedIn} = require('../lib/auth');
const cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'juanhoyos', 
    api_key: '157531265575975', 
    api_secret: 'F11fpudtG9wGVNVMCuMrIQstZ0M',
    secure: true
});

router.get('/add', isLoggedIn,(req, res)=>{
    res.render('links/add');
});

//Post semillero
router.post('/add',isLoggedIn, async (req, res)=>{
    try {
        const {title,description,fecha} = req.body;
        const result = await cloudinary.v2.uploader.upload(req.file.path,{folder:'caidhu'});
        const nuevoSemillero = {
            title:title,
            imageURL:result.url,
            public_id:result.public_id,
            description:description,
            user_id:req.user.id,
            fecha:fecha
        }
        const resultado = await pool.query('INSERT INTO semillero SET ? ',[nuevoSemillero]);
        req.flash('success','Semillero guardado');
    } catch (error) {
        console.log(error);
    }
    res.redirect('/links');
});


router.get('/',isLoggedIn,async(req, res)=>{
    try {
        const semillero = await pool.query('SELECT * FROM links semillero user_id = ?',[req.user.id]);
        res.render('links/list',{links:semillero})
    } catch (error) {
        console.log(error);
    }
});


router.post('/edit/:id',isLoggedIn,async (req, res)=>{
    try {
        const {id} = req.params;
        const {title,description,fecha} = req.body;
        const result = await cloudinary.v2.uploader.upload(req.file.path,{folder:'caidhu'});
        const newLink = {
            title:title,
            imageURL:result.url,
            public_id:result.public_id,
            description:description,
            fecha:fecha
        };
        const resultado = await pool.query('UPDATE semillero set ? WHERE id = ?',[newLink,id]);
        req.flash('success','Semillero actualizado');
        res.redirect('/links');
    } catch (error) {
        console.log(error);
    }
});


router.get('/delete/:id',isLoggedIn,async (req,res)=>{
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM semillero WHERE ID = ?',[id]);
        req.flash('success','Semillero eliminado');
        res.redirect('/links');
    } catch (error) {
        console.log(error);
    }
})


router.get('/user', async(req, res) => {
    const id = 1;
    try {
        const resultado =  await pool.query('SELECT * FROM semillero WHERE user_id = ?',[id]);
        res.send(resultado);
    }catch (error) {
        console.log(error);
    }
})



module.exports = router;
