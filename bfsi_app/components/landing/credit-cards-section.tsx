import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Share, ExternalLink } from 'lucide-react-native';
import { Button } from '../ui/button';

// Map gradient class strings to colors array for LinearGradient
const getGradientColors = (gradientClass: string): readonly [string, string, ...string[]] => {
    if (gradientClass.includes('slate-900')) return ['#0f172a', '#1e293b', '#0f172a'];
    if (gradientClass.includes('red-950')) return ['#450a0a', '#7f1d1d', '#450a0a'];
    if (gradientClass.includes('orange-700')) return ['#c2410c', '#ea580c', '#c2410c'];
    return ['#0f172a', '#1e293b']; // default
};

const creditCards = [
    {
        id: "sapphire",
        name: "Sapphire",
        badge: "HOT SELLER",
        badgeColor: "bg-primary",
        bgGradient: "from-slate-900 via-slate-800 to-slate-900",
        image: require('../../assets/images/Gemini_Generated_Image_2ntywm2ntywm2nty.png'),
        bestFor: "Premium lifestyle offers",
        description: "Lounge Access | Golf Rounds | BookMyShow Offer",
        features: ["Lounge Access", "Golf Rounds", "BookMyShow Offer"],
        applyLink: "/apply/sapphire",
        detailsLink: "/products/sapphire",
    },
    {
        id: "rubyx",
        name: "Rubyx",
        badge: "EXCLUSIVE",
        badgeColor: "bg-primary",
        bgGradient: "from-red-950 via-red-900 to-red-950",
        image: require('../../assets/images/card-ruby.png'),
        bestFor: "High-end lifestyle perks",
        description: "Welcome Vouchers | Complimentary Golf Rounds | Lounge Access",
        features: ["Welcome Vouchers", "Complimentary Golf Rounds", "Lounge Access"],
        applyLink: "/apply/rubyx",
        detailsLink: "/products/rubyx",
    },
    {
        id: "coral",
        name: "Coral",
        badge: "POPULAR",
        badgeColor: "bg-primary",
        bgGradient: "from-orange-700 via-orange-600 to-orange-700",
        image: require('../../assets/images/card-coral.png'),
        bestFor: "Everyday or on-the-go",
        description: "Lounge Access | BookMyShow Offers | INOX Offers",
        features: ["Lounge Access", "BookMyShow Offers", "INOX Offers"],
        applyLink: "/apply/coral",
        detailsLink: "/products/coral",
    },
];

export function CreditCardsSection() {
    const router = useRouter();

    return (
        <View className="py-12 bg-background">
            <View className="px-6 mb-8">
                <Text className="text-2xl font-bold text-foreground">Choose Your Credit Card</Text>
                <Text className="text-muted-foreground mt-2">Premium cards designed for your lifestyle</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-6 gap-6">
                {creditCards.map((card) => (
                    <View key={card.id} className="w-80 h-[450px] rounded-2xl overflow-hidden shadow-lg relative">
                        <LinearGradient
                            colors={getGradientColors(card.bgGradient)}
                            className="absolute inset-0"
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        />

                        {/* Content */}
                        <View className="p-6 flex-1">
                            <View className="flex-row justify-between items-start">
                                <View className={`${card.badgeColor} px-3 py-1 rounded-full`}>
                                    <Text className="text-white text-xs font-bold">{card.badge}</Text>
                                </View>
                                <View className="flex-row gap-2">
                                    <View className="bg-white/10 p-2 rounded-full">
                                        <Heart size={16} color="white" />
                                    </View>
                                </View>
                            </View>

                            <View className="items-center my-6 h-40 justify-center">
                                <Image source={card.image} className="w-full h-full" resizeMode="contain" />
                            </View>

                            <Text className="text-xl font-bold text-white mb-1">{card.name}</Text>
                            <Text className="text-white/80 text-sm mb-4">{card.bestFor}</Text>

                            <View className="gap-1 mb-4">
                                {card.features.map((feature, i) => (
                                    <View key={i} className="flex-row items-center gap-2">
                                        <View className="w-1 h-1 rounded-full bg-white/60" />
                                        <Text className="text-white/80 text-xs">{feature}</Text>
                                    </View>
                                ))}
                            </View>

                            <View className="flex-row gap-3 mt-auto">
                                <Button
                                    className="flex-1 bg-white/20"
                                    onPress={() => router.push(card.applyLink as any)}
                                >
                                    <Text className="text-white font-bold">APPLY</Text>
                                </Button>
                                <Button
                                    className="flex-1 border border-white/30 bg-transparent"
                                    onPress={() => router.push(card.detailsLink as any)}
                                >
                                    <Text className="text-white font-bold">DETAILS</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
