import { create } from 'zustand'

export const useDrawingStore = create((set) => ({
  canvasWidth: 1220,
  canvasHeight: 2440,
  zoom: 1,
  panX: 0,
  panY: 0,
  gridVisible: true,
  snapEnabled: true,
  activeTool: 'select',
  objects: [],
  selectedObjects: [],
  history: [],
  historyIndex: -1,

  setActiveTool: (tool) => set({ activeTool: tool }),
  setZoom: (zoom) => set({ zoom }),
  setPan: (panX, panY) => set({ panX, panY }),
  setGridVisible: (visible) => set({ gridVisible: visible }),
  
  addObject: (obj) =>
    set((state) => ({
      objects: [...state.objects, { ...obj, id: Date.now() }],
    })),

  removeObject: (id) =>
    set((state) => ({
      objects: state.objects.filter((obj) => obj.id !== id),
    })),

  updateObject: (id, updates) =>
    set((state) => ({
      objects: state.objects.map((obj) =>
        obj.id === id ? { ...obj, ...updates } : obj
      ),
    })),

  setSelectedObjects: (ids) => set({ selectedObjects: ids }),
  clearSelection: () => set({ selectedObjects: [] }),
}))