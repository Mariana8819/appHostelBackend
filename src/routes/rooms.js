const express = require('express');
const Room = require('../models/Room');
const router = express.Router();

// Crear una nueva habitación
router.post('/', async (req, res) => {
    const { title, text, image, type, price } = req.body;
    try {
        const newRoom = new Room({ title, text, image, type, price });
        const savedRoom = await newRoom.save();
        res.status(201).json(savedRoom);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener todas las habitaciones
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener una habitación por ID
router.get('/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: 'Habitación no encontrada' });
        res.json(room);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Actualizar una habitación
router.put('/:id', async (req, res) => {
    const { title, text, image, type, price } = req.body;
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: 'Habitación no encontrada' });

        room.title = title;
        room.text = text;
        room.image = image;
        room.type = type;
        room.price = price;

        const updatedRoom = await room.save();
        res.json(updatedRoom);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Eliminar una habitación
router.delete('/:id', async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) return res.status(404).json({ message: 'Habitación no encontrada' });

        res.json({ message: 'Habitación eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
