import React, { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../../styles/colors';
import size from '../../styles/size';

const Dropdown = ({ items, defaultValue, onSelectItem, placeholder, zIndex, key }) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    return (
        <View style={{ zIndex: zIndex, marginHorizontal: '4%', marginBottom: '4%', }}>
            <DropDownPicker
                items={items}
                defaultValue={defaultValue}
                onSelectItem={onSelectItem}
                textStyle={{ fontSize: size.medium, color: colors.black }}
                placeholder={placeholder}
                open={open}
                value={value}
                setOpen={setOpen}
                setValue={setValue}
            />
        </View>
    );
};

export default Dropdown;
