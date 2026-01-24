import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { HeroSection } from '../../components/landing/hero-section';
import { CreditCardsSection } from '../../components/landing/credit-cards-section';
import { ProductsSection } from '../../components/landing/products-section';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <HeroSection />
      <CreditCardsSection />
      <ProductsSection />

      {/* Other sections will go here */}
      <View className="p-6 pb-20">
        <Text className="text-foreground text-xl font-bold text-center">More Sections Coming Soon</Text>
      </View>
    </ScrollView>
  );
}
