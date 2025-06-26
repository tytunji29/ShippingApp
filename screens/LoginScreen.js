import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { PiUserCircleFill, PiPackageFill } from 'react-icons/pi'; // You'll use React Native Vector Icons instead
import LoginIndividual from '../components/LoginIndividual';
import LoginCourier from '../components/LoginCourier';

export default function LoginScreen({ navigation }) {
  const [selectedUserType, setSelectedUserType] = useState('individual');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text className="text-2xl font-bold text-black text-center mb-6">Log In</Text>

        {/* User Type Selector */}
        <View className="flex-row justify-between gap-4 mb-6">
          <TouchableOpacity
            className={`flex-1 border p-4 rounded-md items-center ${
              selectedUserType === 'individual' ? 'border-black' : 'border-gray-300'
            }`}
            onPress={() => setSelectedUserType('individual')}
          >
            {/* Replace with real icon */}
            <Text className="text-xl">👤</Text>
            <Text className="text-base font-semibold text-black mt-2">Individual</Text>
            <Text className="text-xs text-gray-600">To sign up as an individual</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 border p-4 rounded-md items-center ${
              selectedUserType === 'courier' ? 'border-black' : 'border-gray-300'
            }`}
            onPress={() => setSelectedUserType('courier')}
          >
            {/* Replace with real icon */}
            <Text className="text-xl">📦</Text>
            <Text className="text-base font-semibold text-black mt-2">Courier Company</Text>
            <Text className="text-xs text-gray-600">To sign up as a transport company</Text>
          </TouchableOpacity>
        </View>

        {/* Conditional Login Forms */}
        {selectedUserType === 'individual' && <LoginIndividual />}
        {selectedUserType === 'courier' && <LoginCourier />}

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text className="text-center text-green-700 mt-4">
            Don't have an account? <Text className="underline">Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
