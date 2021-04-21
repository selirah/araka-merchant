import React, { useState, useEffect } from 'react';
import { Input, List, message, Avatar } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { appSelector } from '../../helpers/appSelector';
import { path } from '../../helpers/path';
import { Page } from '../../interfaces';
import moment from 'moment';

interface PageDetailsProps {}

interface ParamProps {
  pageId: string;
}

export const PageDetails: React.FC<PageDetailsProps> = () => {
  const { pageId } = useParams<ParamProps>();
  const history = useHistory();
  const auth = appSelector((state) => state.auth);
  const page = appSelector((state) => state.page);
  const [pageDetails, setPageDetails] = useState<Page | undefined>(undefined);
  const [isCopied, setIsCopied] = useState(false);

  const { location } = window;

  useEffect(() => {
    const { isAuthenticated } = auth;
    if (pageId === undefined) {
      switch (isAuthenticated) {
        case true:
          history.push(path.paymentPages);
          break;
        case false:
          history.push(path.login);
      }
    } else {
      const { pages } = page;
      const paymentPage = pages.find(
        (p) => p.paymentPageId === parseInt(pageId)
      );
      if (paymentPage !== undefined) {
        setPageDetails(paymentPage);
      } else {
        message.error('This payment page does not exist', 5);
        switch (isAuthenticated) {
          case true:
            history.push(path.paymentPages);
            break;
          case false:
            history.push(path.login);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paymentLink = `${location.protocol}//${location.host}/payment/${
    pageDetails !== undefined ? pageDetails.processId : ''
  }`;

  const copyLink = () => {
    if (typeof window !== 'undefined') {
      let board = document.createElement('textarea');
      document.body.appendChild(board);
      board.value = paymentLink;
      board.select();
      document.execCommand('copy');
      document.body.removeChild(board);
      setIsCopied(true);
    }
  };

  let initials: string[] = [];
  let name = '';
  if (pageDetails !== undefined) {
    initials = pageDetails.pageName.match(/\b\w/g) || [];
    name = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  }

  return (
    <>
      <div className="page-header">
        <div className="page-image">
          {pageDetails !== undefined && pageDetails.logo !== '' ? (
            <Avatar size={100} src={pageDetails.logo} shape="square" />
          ) : (
            <Avatar
              size={100}
              style={{
                backgroundColor: '#1890ff',
                verticalAlign: 'middle',
              }}
              shape="square"
            >
              {name}
            </Avatar>
          )}
        </div>
        <div className="page-name">
          <h4>Page Name</h4>
          <h4>
            {pageDetails !== undefined
              ? pageDetails.pageName.toUpperCase()
              : ''}
          </h4>
        </div>
        <div className="page-url">
          <Input
            addonBefore={
              <div style={{ cursor: 'pointer' }} onClick={() => copyLink()}>
                {isCopied ? 'Copied!' : 'Copy Link'}
              </div>
            }
            value={paymentLink}
            readOnly
            addonAfter={
              <a href={paymentLink} target="_blank" rel="noreferrer">
                Visit Link
              </a>
            }
          />
        </div>
      </div>

      <List className="list">
        <List.Item>
          <h4 className="key">Page Type</h4>
          <h4 className="value">Payment</h4>
        </List.Item>
        <List.Item>
          <h4 className="key">Currency</h4>
          <h4 className="value">
            {pageDetails !== undefined ? pageDetails.currency : ''}
          </h4>
        </List.Item>
        <List.Item>
          <h4 className="key">Page Amount</h4>
          <h4 className="value">
            {pageDetails !== undefined && pageDetails.amount !== ''
              ? `${pageDetails.currency} ${parseFloat(
                  pageDetails.amount
                ).toFixed(2)}`
              : 'Flexible'}
          </h4>
        </List.Item>
        <List.Item>
          <h4 className="key">Description</h4>
          <h4 className="value">
            {pageDetails !== undefined ? pageDetails.description : ''}
          </h4>
        </List.Item>
        <List.Item>
          <h4 className="key">Redirect URL</h4>
          <h4 className="value">
            {pageDetails !== undefined && pageDetails.redirectURL !== null
              ? pageDetails.redirectURL
              : ''}
          </h4>
        </List.Item>
        <List.Item>
          <h4 className="key">Created On</h4>
          <h4 className="value">
            {pageDetails !== undefined && pageDetails.createdWhen !== null
              ? moment(pageDetails.createdWhen, 'MM/DD/YYYY HH:mm:ss').format(
                  'MMMM D, YYYY (h:mm a)'
                )
              : ''}
          </h4>
        </List.Item>
      </List>
    </>
  );
};
