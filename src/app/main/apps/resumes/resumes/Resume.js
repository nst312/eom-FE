import { useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import ResumeHeader from './ResumeHeader';
import CreateResume from './components/CreateResume';
import ResumeView from './components/ResumeView';

function Resume() {
  const [isShowApiLoading, setIsShowApiLoading] = useState(false);
  return (
    <div className="h-full">
      {isShowApiLoading && (
        <div className="absolute left-0 right-0 top-0 bottom-0 z-9999 text-center pt-14 justify-around flex flex-col">
          <FuseLoading />
        </div>
      )}
      <div className="fixed z-20 left-0 right-0 top-0">
        <ResumeHeader />
      </div>
      <div className="flex z-10 justify-between h-[100vh] pt-64">
        <div className="w-1/2 h-full">
          <CreateResume />
        </div>
        <div className="w-1/2 h-full">
          <ResumeView setIsShowApiLoading={setIsShowApiLoading} />
        </div>
      </div>
    </div>
  );
}

export default Resume;
