import { Image, StyleSheet, Text, View } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { Product } from '../data/constant';

type ProductProps = PropsWithChildren<{
  product: Product;
}>;

const ProductItem = ({ product }: ProductProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <View>
        <Text style={styles.name}>{product.name}</Text>
        <View style={[styles.rowContainer, styles.ratingContainer]}>
          <View style={styles.rating}>
            <Text style={styles.ratingText}>{product.rating} ★</Text>
          </View>
          <Text style={styles.ratingCount}>
            ({product.ratingCount.toLocaleString()})
          </Text>
        </View>

        <View style={[styles.rowContainer, styles.priceContainer]}>
          <Text style={styles.originalPrice}>
            ₹{product.originalPrice.toLocaleString()}
          </Text>
          <Text style={styles.discountPrice}>
            ₹{product.discountPrice.toLocaleString()}
          </Text>
          <Text style={styles.offerPercentage}>
            %{product.offerPercentage} off
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    margin: 0,
    flexDirection: 'row',
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginRight: 12,
  },
  name: {
    marginBottom: 4,
    fontSize: 15,
    fontWeight: '500',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  ratingContainer: {
    marginBottom: 0,
  },
  rating: {
    borderRadius: 4,
    paddingHorizontal: 8,
    justifyContent: 'center',
    backgroundColor: '#008C00',
    marginRight: 4,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  ratingCount: {
    color: '#878787',
  },
  priceContainer: {
    marginBottom: 12,
  },
  originalPrice: {
    fontSize: 18,
    marginRight: 4,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.5)',
    textDecorationLine: 'line-through',
  },
  discountPrice: {
    fontSize: 18,
    marginRight: 4,
    fontWeight: '600',
    color: '#000000',
  },
  offerPercentage: {
    fontSize: 17,
    fontWeight: '600',
    color: '#4BB550',
  },
});
