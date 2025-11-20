import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Category } from '../constants/DummyData'; 
import * as Colors from '../constants/Colors';
import * as Fonts from '../constants/Fonts';

interface CategoryTabsProps {
    categories: Category[];
    selectedCategory: Category;
    onSelectCategory: (category: Category) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, selectedCategory, onSelectCategory }) => {
    
    const renderCategoryTab = (category: Category) => (
        <TouchableOpacity
            key={category}
            style={[
                styles.categoryTab,
                selectedCategory === category && styles.categoryTabActive,
            ]}
            onPress={() => onSelectCategory(category)}
        >
            <Text style={[
                styles.categoryTabText,
                selectedCategory === category && styles.categoryTabTextActive,
            ]}>
                {category}
            </Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryBarContainer}
            contentContainerStyle={styles.categoryBar}
        >
            {categories.map(renderCategoryTab)}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    categoryBarContainer: {
        maxHeight: 45,
    },
    categoryBar: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'transparent',
    },
    categoryTab: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginHorizontal: 5,
        borderColor: Colors.TEXT_LIGHT, 
        borderWidth: 1,
    },
    categoryTabActive: {
        backgroundColor: Colors.PRIMARY, 
        borderColor: Colors.PRIMARY,
    },
    categoryTabText: {
        color: Colors.TEXT_LIGHT,
        fontWeight: Fonts.WEIGHT_BOLD,
        fontSize: Fonts.SIZE_MENU_ITEM_DESC,
    },
    categoryTabTextActive: {
        color: Colors.TEXT_LIGHT,
    },
});

export default CategoryTabs;