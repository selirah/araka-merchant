export interface Search {
  SearchValue: string;
  DateSearch: {
    from: string;
    to: string;
  };
  StatusSearch: string;
  ChannelSearch: string;
  ExportType: string;
}
