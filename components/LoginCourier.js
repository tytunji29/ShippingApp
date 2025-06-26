import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function LoginCourier({ navigation }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    
    // Replace with your real API call (axios or fetch)
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Dashboard'); // Navigate to Dashboard screen
    }, 2000);
  };

  return (
    <View className="w-full space-y-5">
      <View>
        <Text className="mb-1 text-black">Email Address</Text>
        <TextInput
          className="border p-3 rounded"
          placeholder="Email Address"
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <View className="flex-row justify-between pt-4">
          <Text className="text-black">Password *</Text>
          <TouchableOpacity>
            <Text className="text-green-700 underline text-sm">Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          className="border p-3 rounded mt-2"
          placeholder="Password"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
        />
      </View>

      <TouchableOpacity
        className="bg-black p-3 rounded"
        onPress={handleLogin}
        disabled={loading}
      >
        <Text className="text-white text-center text-base font-semibold">
          {loading ? <ActivityIndicator color="#fff" /> : 'Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="border border-black p-3 rounded flex-row items-center justify-center gap-3">
        <Text className="text-black font-semibold">🔍 Log in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
