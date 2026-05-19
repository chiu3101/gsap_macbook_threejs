import {create} from "zustand";

const useMacbookStore = create ((set) => ({
    color:'#2e2c2e',
    setColor: (color) => set({color}),

    scale:0.08,
    setScale: (scale) => set({scale}),

    texture: null,
    setTexture: (texture) => set({texture}),

    reset:() => set({color: '#2e2c2e' , scale: 0.08, texture: null}),
}))

export default useMacbookStore;