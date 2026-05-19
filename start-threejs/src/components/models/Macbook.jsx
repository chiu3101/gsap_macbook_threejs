/*
 * Used by Features.jsx for the scroll-driven 3D spin + video texture animation.
 * Loads macbook-14-transformed.glb (same geometry as the old macbook-transformed.glb).
 * Reads `texture` (a video path) from the global store and applies it as a
 * VideoTexture to the screen mesh (Object_123).
 */

import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { VideoTexture, SRGBColorSpace } from 'three'
import useMacbookStore from '../../store/index.js'
import { noChangeParts } from '../../constants/index.js'
import { Color } from 'three'

export default function MacbookModel(props) {
    const { color, texture: videoPath } = useMacbookStore()
    const { nodes, materials, scene } = useGLTF('/models/macbook-14-transformed.glb')

    const videoRef = useRef(null)
    const videoTextureRef = useRef(null)
    const screenMeshRef = useRef(null)

    // Apply body color changes
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                if (!noChangeParts.includes(child.name)) {
                    child.material.color = new Color(color)
                }
            }
        })
    }, [color, scene])

    // Wire up video texture when videoPath changes
    useEffect(() => {
        if (!videoPath || !screenMeshRef.current) return

        // Clean up previous video element
        if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.src = ''
        }

        const video = document.createElement('video')
        Object.assign(video, {
            src: videoPath,
            muted: true,
            loop: true,
            playsInline: true,
            autoplay: true,
            crossOrigin: 'anonymous',
        })
        video.play().catch(() => {})
        videoRef.current = video

        const vt = new VideoTexture(video)
        vt.colorSpace = SRGBColorSpace
        videoTextureRef.current = vt

        screenMeshRef.current.material.map = vt
        screenMeshRef.current.material.needsUpdate = true

        return () => {
            video.pause()
            video.src = ''
            vt.dispose()
        }
    }, [videoPath])

    return (
        <group {...props} dispose={null}>
            <mesh geometry={nodes.Object_10.geometry} material={materials.PaletteMaterial001} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_16.geometry} material={materials.zhGRTuGrQoJflBD} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_20.geometry} material={materials.PaletteMaterial002} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_22.geometry} material={materials.lmWQsEjxpsebDlK} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_30.geometry} material={materials.LtEafgAVRolQqRw} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_32.geometry} material={materials.iyDJFXmHelnMTbD} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_34.geometry} material={materials.eJObPwhgFzvfaoZ} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_38.geometry} material={materials.nDsMUuDKliqGFdU} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_42.geometry} material={materials.CRQixVLpahJzhJc} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_48.geometry} material={materials.YYwBgwvcyZVOOAA} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_54.geometry} material={materials.SLGkCohDDelqXBu} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_58.geometry} material={materials.WnHKXHhScfUbJQi} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_66.geometry} material={materials.fNHiBfcxHUJCahl} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_74.geometry} material={materials.LpqXZqhaGCeSzdu} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_82.geometry} material={materials.gMtYExgrEUqPfln} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_96.geometry} material={materials.PaletteMaterial003} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_107.geometry} material={materials.JvMFZolVCdpPqjj} rotation={[Math.PI / 2, 0, 0]} />
            {/* Screen mesh — video texture applied here via ref */}
            <mesh ref={screenMeshRef} geometry={nodes.Object_123.geometry} rotation={[Math.PI / 2, 0, 0]}>
                <meshBasicMaterial />
            </mesh>
            <mesh geometry={nodes.Object_127.geometry} material={materials.ZCDwChwkbBfITSW} rotation={[Math.PI / 2, 0, 0]} />
        </group>
    )
}

useGLTF.preload('/models/macbook-14-transformed.glb')
