import * as React from 'react';
import { View } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';

import AppButton from './AppButton';
import AppIcon from './AppIcon';
import AppText from './AppText';

import { useAuthStore } from '../store/auth';
import { Pressable } from 'react-native';
import colors, { material_colors } from '../config/colors';
import { useQueryClient } from '@tanstack/react-query';




type AppDrawerProps = {
    children: React.ReactNode;
}


const AppDrawer: React.FC<AppDrawerProps> = ({
    children
}) => {
    const [open, setOpen] = React.useState(false);

    const queryClient = useQueryClient();
    const logoutUser = useAuthStore((state) => state.logout);

    const logoutUserOnSubmit = () => {
        queryClient.clear();
        logoutUser();
    }

    return (
        <Drawer
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            renderDrawerContent={() => {
                return (
                    <View style={{flex: 1, justifyContent: 'space-between', backgroundColor: colors.dark, paddingVertical: '8.125%'}}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <AppIcon name='account-circle' size={100} backgroundColor='transparent' iconColor={material_colors.cyan.accent3} align='center' />
                            <AppText passedStyle={{fontFamily: 'Inter-Black'}} text={'__USER__'}/>
                        </View>

                        <View style={{flex: 3,  justifyContent: 'flex-end'}}>
                            <Pressable style={{flexDirection: 'row', alignItems: 'center'}} onPress={logoutUserOnSubmit}>
                                <AppIcon name='logout-variant' size={60} backgroundColor='transparent' iconColor={material_colors.cyan.accent3} align='center' />
                                <AppText passedStyle={{fontFamily: 'Inter-Light'}} text={'Logout'}/>
                            </Pressable>
                        </View>
                    </View>
                    
                );
            }}
        >
                <View style={{flexDirection: 'row', backgroundColor: colors.dark, justifyContent: 'space-between'}}>
                    <Pressable onPress={() => setOpen((prevOpen) => !prevOpen)} style={{backgroundColor: 'transparent', paddingTop: '8.125%'}}>
                        <AppIcon name='menu' size={80} backgroundColor='transparent' iconColor={material_colors.cyan.accent3} align='flex-start' />
                    </Pressable>

                    <Pressable onPress={() => console.log('search')} style={{backgroundColor: 'transparent', paddingTop: '8.125%'}}>
                        <AppIcon name='magnify' size={80} backgroundColor='transparent' iconColor={material_colors.grey.darken2} align='flex-end' />
                    </Pressable>
                </View>
                

            {children}
        </Drawer>
    );
}

export default AppDrawer;