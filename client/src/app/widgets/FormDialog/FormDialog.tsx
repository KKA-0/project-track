"use client"

import * as React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { useAppDispatch } from "./../../../libs/hooks/hooks";
import { createPlaylist } from "./../../../libs/features/playlists.api";
import Custom from "./../custom/custom";
import { usePost } from '@/utils/api/apiService';
import ls, { get, set } from "local-storage";


export default function FormDialog() {
  const post = usePost('playlists');
  const [open, setOpen] = React.useState(false);
  const [backdropState, setBackdropState] = React.useState(false);
  const [playlistVideos, setPlaylistVideos] = React.useState("");
  const URI = useRef<HTMLInputElement | null>(null);
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

  const handlePlaylists = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    if (URI.current) {
      const url = URI.current.value;
      if (url) {
        try {
          const urlObj = new URL(url);
          const listParam = urlObj.searchParams.get("list");

          if (listParam) {
            handleClose();
            handleOpenBackdrop();
            post.mutate({ playlistId: listParam }, {
              onSuccess: (data: any) => {
                console.log(data);

                if (!data.id) {
                  interface Playlist {
                    [key: string]: any;
                    playlistId: string;
                  }
                  const playlistData = get('playlists') as Playlist || {};
                  const playlistId = data.playlistid;
                  playlistData[playlistId] = data;
                  set('playlists', playlistData);
                }
                handleCloseBackdrop()
                window.location.reload();
              }
            });
            setPlaylistVideos(url);
          } else {
            console.error("No 'list' parameter found in the URL");
          }
        } catch (error) {
          console.error("Invalid URL", error);
        }
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
                    'Using AI Magic ✨',
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

      {/* Add Playlist Button */}
      <button
        onClick={handleClickOpen}
        className="m-8 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg
          hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200
          shadow-lg hover:shadow-purple-500/25 font-medium"
      >
        Add New Playlist
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
                  <form onSubmit={handlePlaylists}>
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-semibold leading-6 text-gray-900 mb-4"
                    >
                      Add New Playlist
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-4">
                        Please provide the link to the YouTube playlist you wish to add.
                      </p>
                      <div className="mt-4">
                        <input
                          ref={URI}
                          type="text"
                          name="playlist"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                          placeholder="https://www.youtube.com/playlist"
                          required
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="mt-6 flex justify-end space-x-3">
                        <Custom />
                      </div>
                      <div className="mt-6 flex justify-end space-x-3">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-all duration-200"
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
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