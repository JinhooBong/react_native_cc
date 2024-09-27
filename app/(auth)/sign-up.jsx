import React from 'react';
import { Image, ScrollView, View, Text } from 'react-native';
import images from "../../constants/images";
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link } from "expo-router"

const SignUp = () => {
	const [form, setForm] = React.useState({
		username: '',
		email: '',
		password: ''
	})

	const [isSubmitting, setIsSubmitting] = React.useState(false);

	const submit = () => {

	}

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView className="mx-5">
				<View className="w-full flex justify-center px-4 my-6">
					<Image 
						source={images.logo}
						resizeMode="contain"
						className="w-[115px] h-[35px]"
					/>
				</View>
				<Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign up to Aora</Text>
				<FormField 
					title="Username"
					value={form.username}
					handleChangeText={(e) => setForm({...form, username: e })}
					otherStyles="mt-10"
				/>
				<FormField 
					title="Email"
					value={form.email}
					handleChangeText={(e) => setForm({...form, email: e })}
					otherStyles="mt-7"
					keyboardType="email-address"
				/>
				<FormField 
					title="Password"
					value={form.password}
					handleChangeText={(e) => setForm({...form, password: e })}
					otherStyles="mt-7"
				/>

				<CustomButton 
					title="Sign In"
					handlePress={submit}
					containerStyles="mt-7"
					isLoading={isSubmitting}
				/>

				<View className="justify-center pt-5 flex-row gap-2">
					<Text className="text-lg text-gray-100 font-pregular">Have an account already?</Text>
					<Link href="/sign-in" className="text-lg font-psemibold text-secondary">Sign In</Link>
				</View>
			</ScrollView>
		</SafeAreaView>
  	)
}

export default SignUp