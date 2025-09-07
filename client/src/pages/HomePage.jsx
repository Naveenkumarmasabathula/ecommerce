// client/src/pages/HomePage.jsx
import React, { useState, useEffect, useMemo, useContext } from 'react';
import axios from 'axios';
import CartContext from '../context/CartContext.jsx';
import { motion } from 'framer-motion';

import {
  Container, Grid, Card, CardContent, CardActions, Typography,
  Button, TextField, Box, Skeleton, Paper, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({ category: '', maxPrice: '' });
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchItems = async () => {
        setLoading(true);
        try {
          const apiFilters = { ...filters };
          if (apiFilters.category === 'All Categories') apiFilters.category = '';
          const { data } = await axios.get('/items', { params: apiFilters });
          setItems(data);
        } catch (error) {
          toast.error('Could not load products.');
        } finally {
          setLoading(false);
        }
      };
      fetchItems();
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  // ✅ RESTORED CATEGORY LOGIC
  const uniqueCategories = useMemo(() => {
    if (!items.length) return [];
    const categories = new Set(items.map(item => item.category));
    return ['All Categories', ...categories];
  }, [items]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  
  // ✅ NEW 'CLEAR FILTERS' FUNCTION
  const clearFilters = () => {
    setFilters({ category: '', maxPrice: '' });
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  const SkeletonCard = () => (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%' }}>
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="30%" sx={{ mt: 2 }}/>
        </CardContent>
        <CardActions sx={{ p: 2 }}>
          <Skeleton variant="rounded" width="100%" height={40} />
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Our Products
      </Typography>

      {/* ✅ RESTORED & STYLED FILTER CONTROLS */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
          Filter By
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={filters.category}
              label="Category"
              onChange={handleFilterChange}
            >
              {uniqueCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Max Price"
            name="maxPrice"
            type="number"
            variant="outlined"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            sx={{ maxWidth: 150 }}
          />
          <Button variant="outlined" onClick={clearFilters} sx={{ ml: 'auto' }}>
            Clear Filters
          </Button>
        </Box>
      </Paper>

      <Grid container spacing={4}>
        {loading ? (
          Array.from(new Array(6)).map((_, index) => <SkeletonCard key={index} />)
        ) : items.length > 0 ? (
          items.map((item, index) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 6 } }}>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 500 }}>
                      {item.name}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {item.category}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                      ${item.price}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button fullWidth size="medium" variant="contained" onClick={() => handleAddToCart(item)}>
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No products found matching your filters.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default HomePage;