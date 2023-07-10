import { createReducer } from "@reduxjs/toolkit";

export const otherReducer = createReducer({}, (builder) => {
    builder
        .addCase("updatePasswordRequest", (state) => {
            state.loading = true;
        })
        .addCase("updateProfileRequest", (state) => {
            state.loading = true;
        })
        .addCase("updatePasswordSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("updateProfileSuccess", (state) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("updatePasswordFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("updateProfileFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    builder.addCase("clearError", (state, action) => {
        state.error = null;
    });
    builder.addCase("clearMessage", (state, action) => {
        state.message = null;
    });
});
