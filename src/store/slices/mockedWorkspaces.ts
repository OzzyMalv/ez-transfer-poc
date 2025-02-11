import { ProjectDataType } from "@/api/types/workspace.types";

export const mockedWorkspaces = [
  {
    id: "workspace-123",
    type: "personal",
    name: "My Workspace",
    rootFolderId: "folder-001",
    owner: true,
    folders: [],
    basicTransfer: false,
    isAnalyseAllActive: false,
    filesBeingAnalysed: [],
    transferDrawerOpen: false,
    transferType: "upload",
    currentTransfer: {},
    filesUploading: [],
    foldersUploading: [],
    transferId: "transfer-123",
    transferPolling: false,
    transferStatus: "completed",
    shareLinkUrl: "https://example.com/sharelink",
    showShareLink: true,
    filesWithVirus: [],
  },
];

export const files = [
  {
    id: "file1",
    name: "pexels-photo-2325307.jpeg",
    size: 10240,
    status: "Complete",
    preview: {
      largeThumbnailUrl:
        "https://images.pexels.com/photos/2707972/pexels-photo-2707972.jpeg",
    },
  },
  {
    id: "file2",
    name: "5737339-hd_1920_1080_24fps.mp4",
    size: 10240,
    status: "Complete",
    preview: {
      hasProxy: true,
      smallProxyUrl:
        "https://videos.pexels.com/video-files/5737339/5737339-hd_1920_1080_24fps.mp4",
      largeThumbnailUrl: null,
    },
  },
  {
    id: "file3",
    name: "5737339-hd_1920_1080_24fps.mp4",
    size: 10240,
    status: "Complete",
    preview: {
      hasProxy: true,
      smallProxyUrl:
        "https://videos.pexels.com/video-files/20708668/20708668-hd_1080_1920_24fps.mp4",
      largeThumbnailUrl: null,
    },
  },
];

export const mockedProjects: ProjectDataType[] = [
  {
    id: "1",
    name: "Project Alpha",
    numberOfFiles: 10,
    totalFileSize: 5000,
    modifiedDate: "2024-02-10T12:00:00Z",
    files: files,
    preview: {
      largeThumbnailUrl:
        "https://images.pexels.com/photos/126292/pexels-photo-126292.jpeg",
    },
  },
  {
    id: "2",
    name: "Project Beta",
    numberOfFiles: 5,
    totalFileSize: 2000,
    modifiedDate: "2024-02-09T08:30:00Z",
    files: files,
    preview: {
      largeThumbnailUrl:
        "https://images.pexels.com/photos/442583/pexels-photo-442583.jpeg",
    },
  },
  {
    id: "3",
    name: "Project Beta",
    numberOfFiles: 5,
    files: files,
    totalFileSize: 2000,
    modifiedDate: "2024-02-09T08:30:00Z",
    preview: {
      largeThumbnailUrl:
        "https://images.pexels.com/photos/2707972/pexels-photo-2707972.jpeg",
    },
  },

  {
    id: "4",
    name: "Project video",
    numberOfFiles: 5,
    totalFileSize: 2000000,
    modifiedDate: "2024-02-10T08:30:00Z",
    files: [
      {
        id: "file1",
        name: "pexels-photo-2325307.jpeg",
        size: 10240,
        status: "Complete",
        preview: {
          largeThumbnailUrl:
            "https://images.pexels.com/photos/2707972/pexels-photo-2707972.jpeg",
        },
      },
      {
        id: "file2",
        name: "5737339-hd_1920_1080_24fps.mp4",
        size: 10240,
        status: "Complete",
        preview: {
          hasProxy: true,
          smallProxyUrl:
            "https://videos.pexels.com/video-files/5737339/5737339-hd_1920_1080_24fps.mp4",
          largeThumbnailUrl: null,
        },
      },
    ],
    preview: {
      largeThumbnailUrl: null,
    },
  },
  {
    id: "6",
    name: "Project Beta coffee and newspaper",
    numberOfFiles: 2,
    totalFileSize: 3300000,
    modifiedDate: "2024-02-09T08:30:00Z",
    files: [],
    preview: {
      largeThumbnailUrl:
        "https://images.pexels.com/photos/2325307/pexels-photo-2325307.jpeg",
    },
  },
];

export const mockRequestFiles = {
  workspaceId: "workspace-123",
  folderId: "folder-456",
  files: [
    { name: "document.pdf", size: 102400 },
    { name: "image.png", size: 204800 },
    { name: "video.mp4", size: 10485760 },
  ],
};
