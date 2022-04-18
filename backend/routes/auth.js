// const express = require('express')
// const router = express.Router();

// router.get('/', (req , res) =>{
//     // a={
//     //     name:"Ram",
//     //     role:"dev"
//     // }
//     // res.json(a);
//     console.log(req.body);
//     res.send(req.body);
// })

// module.exports = router 

const express = require('express')
const router = express.Router();

router.get('/',(req,res)=>{
    // a = {
    //     name : "pranjal",
    //     role : "dev"
    // }
    // res.json(a);
    console.log(req.body);
    res.send("hello");

})

module.exports = router