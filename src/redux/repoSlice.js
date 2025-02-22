import { createSlice } from "@reduxjs/toolkit";

const repoSlice = createSlice({
  name: "repos",
  initialState: { repositories: [], selectedRepo: null, branches: [], pullRequests: [] },
  reducers: {
    setRepositories: (state, action) => {
      state.repositories = action.payload;
    },
    selectRepository: (state, action) => {
      state.selectedRepo = action.payload;
      state.branches = [];
      state.pullRequests = [];
    },
    setBranches: (state, action) => {
      state.branches = action.payload;
    },
    setPullRequests: (state, action) => {
      state.pullRequests = action.payload;
    },
  },
});

export const { setRepositories, selectRepository, setBranches, setPullRequests } = repoSlice.actions;
export default repoSlice.reducer;
