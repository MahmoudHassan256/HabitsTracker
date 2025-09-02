import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';

// If using React Navigation
// import { useNavigation } from '@react-navigation/native';

interface NotFoundScreenProps {
  navigation?: any; // Replace with proper navigation type if using React Navigation
}

const NotFoundScreen: React.FC<NotFoundScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [bounceAnim] = useState(new Animated.Value(0));
  const [rotateAnim] = useState(new Animated.Value(0));

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Bounce animation for 404 text
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const handleGoHome = () => {
    if (navigation) {
      navigation.navigate('Home'); // Adjust route name as needed
    } else {
      console.log('Navigate to Home');
    }
  };

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack();
    } else {
      console.log('Go back');
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      if (navigation) {
        navigation.navigate('Search', { query: searchQuery });
      } else {
        console.log('Search for:', searchQuery);
      }
    }
  };

  const bounceTranslate = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Animated 404 */}
        <View style={styles.errorContainer}>
          <Animated.Text
            style={[styles.errorCode, { transform: [{ translateY: bounceTranslate }] }]}>
            404
          </Animated.Text>

          {/* Rotating icon */}
          <Animated.View
            style={[styles.iconContainer, { transform: [{ rotate: rotateInterpolate }] }]}>
            <Text style={styles.icon}>🔍</Text>
          </Animated.View>
        </View>

        {/* Error Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.title}>Oops! Page Not Found</Text>
          <Text style={styles.subtitle}>
            The screen you're looking for seems to have wandered off into the digital void.
          </Text>
          <Text style={styles.description}>
            Don't worry, even the best explorers sometimes take a wrong turn!
          </Text>
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for what you need..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch} activeOpacity={0.8}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleGoHome}
            activeOpacity={0.8}>
            <Text style={styles.buttonText}>🏠 Go Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleGoBack}
            activeOpacity={0.8}>
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>← Go Back</Text>
          </TouchableOpacity>
        </View>

        {/* Helpful Links */}
        <View style={styles.linksContainer}>
          <Text style={styles.linksTitle}>Maybe try these instead:</Text>
          <View style={styles.linksList}>
            <TouchableOpacity style={styles.link} activeOpacity={0.7}>
              <Text style={styles.linkText}>• Popular Items</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} activeOpacity={0.7}>
              <Text style={styles.linkText}>• Categories</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} activeOpacity={0.7}>
              <Text style={styles.linkText}>• Help & Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  errorContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  errorCode: {
    fontSize: 120,
    fontWeight: 'bold',
    color: '#7c3aed',
    textShadowColor: 'rgba(124, 58, 237, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  iconContainer: {
    position: 'absolute',
    top: 40,
    right: -20,
  },
  icon: {
    fontSize: 30,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  searchContainer: {
    width: '100%',
    marginBottom: 30,
  },
  searchInput: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchButton: {
    backgroundColor: '#7c3aed',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 30,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 12,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: '#4f46e5',
    shadowColor: '#4f46e5',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  secondaryButtonText: {
    color: '#374151',
  },
  linksContainer: {
    alignItems: 'center',
  },
  linksTitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 12,
    fontWeight: '500',
  },
  linksList: {
    alignItems: 'flex-start',
  },
  link: {
    paddingVertical: 4,
  },
  linkText: {
    fontSize: 14,
    color: '#7c3aed',
    fontWeight: '500',
  },
});

export default NotFoundScreen;
