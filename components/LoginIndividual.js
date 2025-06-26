import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginIndividual() {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // fake for now

  const handleLogin = async () => {
    setLoading(true);

    // Simulate API login
    setTimeout(() => {
      setLoading(false);
      setIsAuthenticated(true);
    }, 1500);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Dashboard');
    }
  }, [isAuthenticated]);

  return (
    <View className="w-full space-y-5">
      <View>
        <Text className="mb-1 text-black">Email Address</Text>
        <TextInput
          className="border p-3 rounded"
          placeholder="Email Address"
          autoCapitalize="none"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
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
        className="bg-green-700 p-3 rounded"
        onPress={handleLogin}
        disabled={loading}
      >
        <Text className="text-white text-center font-semibold">
          {loading ? <ActivityIndicator color="#fff" /> : 'Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="border border-black p-3 rounded flex-row items-center justify-center gap-3">
        <Text className="text-black font-semibold">🔍 Log in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
