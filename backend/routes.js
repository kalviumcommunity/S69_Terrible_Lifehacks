const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = require('./models/Item');

//POST
router.post('/items', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000, // 1 day
    });

    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//GET
router.get('/items',async(req,res)=>{
    try{
        const Items = await Item.find();
        res.status(200).json({message:'items found',Items});

    }catch(err){
        res.status(400).json({message:err.message});
    }
});

//GET BY ID
router.get('/items/:id', async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.status(200).json(item);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

//UPDATE BY ID
router.put('/items/:id',async(req,res)=>{
    try{
        const {name} = req.body;
        const updated = await Item.findByIdAndUpdate(req.params.id, {name},{new:true});
        
        if(!updated){
            return res.status(404).json({message:'item not found'});
        }
        res.status(200).json({message:'updated successfully',updated});
    }catch(err){
        res.status(400).json({message: err.message});
    }
})

// DELETE BY ID
router.delete('/items/:id', async (req, res) => {
    try {
      const deleted = await Item.findByIdAndDelete(req.params.id);  // Delete item
      if (!deleted) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.status(200).json({ message: 'Item deleted', deleted});
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  module.exports = router;