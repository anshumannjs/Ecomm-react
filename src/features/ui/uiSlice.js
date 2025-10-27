import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    toasts: [],
    isMobileMenuOpen: false,
    isSearchOpen: false,
    activeModal: null,
};

let toastId = 0;

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        showToast: (state, action) => {
            const { message, type = 'info', duration = 3000 } = action.payload;
            const id = ++toastId;

            state.toasts.push({
                id,
                message,
                type,
                duration,
                createdAt: Date.now(),
            });
        },
        removeToast: (state, action) => {
            state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
        },
        clearToasts: (state) => {
            state.toasts = [];
        },
        toggleMobileMenu: (state) => {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
        closeMobileMenu: (state) => {
            state.isMobileMenuOpen = false;
        },
        openMobileMenu: (state) => {
            state.isMobileMenuOpen = true;
        },
        toggleSearch: (state) => {
            state.isSearchOpen = !state.isSearchOpen;
        },
        closeSearch: (state) => {
            state.isSearchOpen = false;
        },
        openSearch: (state) => {
            state.isSearchOpen = true;
        },
        openModal: (state, action) => {
            state.activeModal = action.payload;
        },
        closeModal: (state) => {
            state.activeModal = null;
        },
    },
});

export const {
    showToast,
    removeToast,
    clearToasts,
    toggleMobileMenu,
    closeMobileMenu,
    openMobileMenu,
    toggleSearch,
    closeSearch,
    openSearch,
    openModal,
    closeModal,
} = uiSlice.actions;// Selectors
export const selectToasts = (state) => state.ui.toasts;
export const selectIsMobileMenuOpen = (state) => state.ui.isMobileMenuOpen;
export const selectIsSearchOpen = (state) => state.ui.isSearchOpen;
export const selectActiveModal = (state) => state.ui.activeModal; export default uiSlice.reducer;