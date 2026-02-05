  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import Notes from "./components/Notes";
  import Valentine from "./components/Valentine";
  import { MusicProvider } from "./components/MusicProvider";

  export default function App() {
    return (
      <MusicProvider>
        <BrowserRouter basename="/project-valentine">
          <Routes>
            <Route path="/" element={<Notes />} />
            <Route path="/valentine" element={<Valentine />} />
          </Routes>
        </BrowserRouter>
      </MusicProvider>
    );
  }
