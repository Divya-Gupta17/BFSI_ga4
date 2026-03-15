import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter, Link, Stack } from 'expo-router';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import { Button } from '../components/ui/button';

export default function LoginScreen() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    const handleLogin = () => {
        // Navigate to Tabs / Dashboard
        router.replace('/(tabs)');
    };

    return (
        <ScrollView contentContainerClassName="flex-grow bg-background px-6 py-12 justify-center">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Logo */}
            <View className="flex-row items-center justify-center gap-3 mb-8">
                <View className="h-12 w-12 items-center justify-center rounded-lg bg-primary">
                    <Shield size={28} color="white" />
                </View>
                <Text className="text-2xl font-bold text-foreground">SecureBank</Text>
            </View>

            {/* Header */}
            <View className="items-center mb-8">
                <Text className="text-3xl font-bold text-foreground">Log In</Text>
                <Text className="mt-2 text-muted-foreground text-center">Enter your credentials to access your account</Text>
            </View>

            {/* Form */}
            <View className="gap-6">
                {/* Email */}
                <View className="gap-2">
                    <Text className="text-sm font-medium text-foreground">Email Address</Text>
                    <View className="relative">
                        <View className="absolute inset-y-0 left-0 pl-3 justify-center z-10 w-10">
                            <Mail size={20} color="#64748b" />
                        </View>
                        <TextInput
                            className="flex-1 w-full pl-10 pr-3 py-3 border border-input rounded-lg bg-background text-foreground"
                            placeholder="you@example.com"
                            placeholderTextColor="#64748b"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                </View>

                {/* Password */}
                <View className="gap-2">
                    <Text className="text-sm font-medium text-foreground">Password</Text>
                    <View className="relative">
                        <View className="absolute inset-y-0 left-0 pl-3 justify-center z-10 w-10">
                            <Lock size={20} color="#64748b" />
                        </View>
                        <TextInput
                            className="flex-1 w-full pl-10 pr-12 py-3 border border-input rounded-lg bg-background text-foreground"
                            placeholder="••••••••"
                            placeholderTextColor="#64748b"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 justify-center z-10"
                        >
                            {showPassword ? (
                                <EyeOff size={20} color="#64748b" />
                            ) : (
                                <Eye size={20} color="#64748b" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Remember Me & Forgot Password */}
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity
                        className="flex-row items-center"
                        onPress={() => setRememberMe(!rememberMe)}
                    >
                        <View className={`h-4 w-4 rounded border border-input mr-2 items-center justify-center ${rememberMe ? 'bg-primary border-primary' : ''}`}>
                            {rememberMe && <Text className="text-primary-foreground text-xs">✓</Text>}
                        </View>
                        <Text className="text-sm text-foreground">Remember me</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text className="text-sm font-medium text-primary">Forgot password?</Text>
                    </TouchableOpacity>
                </View>

                {/* Submit Button */}
                <Button size="lg" onPress={handleLogin} className="w-full">
                    Log In
                    <ArrowRight size={20} color="#ffffff" />
                </Button>
            </View>

            {/* Divider */}
            <View className="relative my-6">
                <View className="absolute inset-0 justify-center">
                    <View className="w-full border-t border-border" />
                </View>
                <View className="relative flex-row justify-center">
                    <Text className="px-4 bg-background text-muted-foreground text-sm">Or</Text>
                </View>
            </View>

            {/* Sign Up Link */}
            <View className="flex-row justify-center">
                <Text className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                </Text>
                <Link href="/register" asChild>
                    <TouchableOpacity>
                        <Text className="text-sm font-semibold text-primary">Sign up now</Text>
                    </TouchableOpacity>
                </Link>
            </View>

            {/* Security Badge */}
            <View className="mt-8 flex-row items-center justify-center gap-2">
                <Shield size={16} color="#64748b" />
                <Text className="text-xs text-muted-foreground">Protected by 256-bit SSL encryption</Text>
            </View>
        </ScrollView>
    )
}
