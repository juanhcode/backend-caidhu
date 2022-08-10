const {Router} = require('express');
const router = Router();
const pool = require('../databases/databases');
const {isLoggedIn} = require('../lib/auth')
router.get('/add', isLoggedIn,(req, res)=>{
    res.render('links/add');
});

router.post('/add',isLoggedIn, async (req, res)=>{
    try {
        const {title,url,description} = req.body;
        const newLink = {
            title,
            url,
            description,
            user_id: req.user.id,
        };
        const resultado = await pool.query('INSERT INTO links SET ? ',[newLink]);
        req.flash('success','Semillero guardado');
    } catch (error) {
        console.log(error);
    }
    res.redirect('/links');
});

router.get('/',isLoggedIn,async(req, res)=>{
    try {
        const links = await pool.query('SELECT * FROM semillero WHERE user_id = ?',[req.user.id]);
        res.render('links/list',{links:links})
    } catch (error) {
        console.log(error);
    }
});

router.get('/delete/:id',isLoggedIn,async (req,res)=>{
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM links WHERE ID = ?',[id]);
        req.flash('success','Semillero eliminado');
        res.redirect('/links');
    } catch (error) {
        console.log(error);
    }
})

router.get('/edit/:id',isLoggedIn,async (req,res)=>{
    try {
        const {id} = req.params;
        const links = await pool.query('SELECT * FROM semillero WHERE id = ?',[id]);
        res.render('links/edit',{link:links[0]});
    } catch (error) {
        console.log(error);
    }
})

router.post('/edit/:id',isLoggedIn,async (req, res)=>{
    try {
        const {id} = req.params;
        const {title,url,description} = req.body;
        const newLink = {
            title,
            description,
            url,
        };
        const resultado = await pool.query('UPDATE links set ? WHERE id = ?',[newLink,id]);
        req.flash('success','Semillero actualizado');
        res.redirect('/links');
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;
