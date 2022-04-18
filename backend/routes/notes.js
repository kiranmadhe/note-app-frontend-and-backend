const express =require('express');
const router = express.Router();

router.get('/', (req , res) =>{
    a={
        name:"Ramu",
        role:"maneger"
    }
    res.json(a);
})

module.exports = router 