"use client"

import * as React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { useAppDispatch } from "../../../libs/hooks/hooks";
import { createPlaylist } from "../../../libs/features/playlists.api";

export default function Custom() {
  const [open, setOpen] = React.useState(false);
  const [backdropState, setBackdropState] = React.useState(false);
  const [playlistTitle, setPlaylistTitle] = React.useState("");
  const [videoLinks, setVideoLinks] = React.useState([""]);
  const videoLinksRef = useRef<HTMLInputElement[]>([]);
  const dispatch = useAppDispatch();

  const statePlaylists = useSelector((state: any) => state.store.playlists);

  useEffect(() => {
    handleCloseBackdrop();
  }, [statePlaylists]);

  const handleCloseBackdrop = () => {
    setBackdropState(false);
  };

  const handleOpenBackdrop = () => {
    setBackdropState(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddVideoLink = () => {
    setVideoLinks([...videoLinks, ""]);
  };

  const handleVideoLinkChange = (index: number, value: string) => {
    setVideoLinks(
      videoLinks.map((link, i) => (i === index ? value : link))
    );
  };

  const handleCreatePlaylist = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    if (playlistTitle) {
      try {
        const playlist = {
          title: playlistTitle,
          videoLinks: videoLinks.filter(link => link !== ""),
        };

        // dispatch(createPlaylist({playlist}));
        handleClose();
        handleOpenBackdrop();
        setPlaylistTitle(""); 
        setVideoLinks([""]);
      } catch (error) {
        console.error("Invalid playlist data", error);
      }
    }
  };

  return (
    <Fragment>
      {/* Loading Backdrop */}
      <Transition show={backdropState} as={Fragment}>
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-900/50 p-8 rounded-2xl backdrop-blur-md border border-gray-700 max-w-md w-full mx-4">
            <div className="flex flex-col items-center space-y-6">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              <div className="text-purple-400 text-lg font-medium">
                <TypeAnimation
                  sequence={[
                    'Fetching playlist data',
                    3000,
                    'Generating playlist data',
                    10000,
                    'Using AI Magic ',
                    10000,
                    'Making Things Ready!!!',
                    5000,
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                  style={{ fontSize: '1.125em', display: 'inline-block' }}
                />
              </div>
              <p className="text-gray-400 text-center">
                Please wait a moment, this may take up to a minute.
              </p>
              <button
                onClick={handleCloseBackdrop}
                className="px-4 py-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Transition>

      {/* Add Custom Playlist Button */}
      <button
        onClick={handleClickOpen}
        type="button"
        className="inline-flex justify-center rounded-lg border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-all duration-200"
      >
        Create custom playlist
      </button>

      {/* Dialog */}
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={handleCreatePlaylist}>
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-semibold leading-6 text-gray-900 mb-4"
                    >
                      Add New Playlist
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Please provide the title and video links for the playlist.
                      </p>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title
                        </label>
                        <input
                          value={playlistTitle}
                          onChange={(e) => setPlaylistTitle(e.target.value)}
                          type="text"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                          placeholder="Enter playlist title"
                          required
                          autoFocus
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Video Links
                        </label>
                        {videoLinks.map((link, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              ref={(el: HTMLInputElement | null) => {
                                if (el) videoLinksRef.current[index] = el;
                              }}
                              value={link}
                              onChange={(e) => handleVideoLinkChange(index, e.target.value)}
                              type="text"
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                              placeholder="Enter video link"
                              required
                            />
                            <button
                              type="button"
                              className="px-2 py-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                              onClick={() => handleAddVideoLink()}
                            >
                              +
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="mt-6 flex justify-end space-x-3">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-all duration-200"
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="mt-6 flex justify-end space-x-3">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-lg border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-all duration-200"
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
}