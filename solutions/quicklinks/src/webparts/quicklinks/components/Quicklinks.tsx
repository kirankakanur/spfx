import * as React from 'react';
import styles from './Quicklinks.module.scss';
import { IQuicklinksProps } from './IQuicklinksProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Quicklinks extends React.Component<IQuicklinksProps, {}> {
  public render(): React.ReactElement<IQuicklinksProps> {    
  let quickLinksMarkup = "";
  let i;

  if(this.props.quickLinksCollection != null)
  {
  for (i=0; i < this.props.quickLinksCollection.length; i++)
  {
    quickLinksMarkup += "<div>" +
                           "<a href='" + this.props.quickLinksCollection[i].link + "'>" + this.props.quickLinksCollection[i].name + "</a>" +
                           "</div>";
  } 
}

  return(
    <div className = { styles.quicklinks } >
<div className={styles.container}>
  <div className={styles.row}>
    <div className={styles.column}>
      <span className={styles.title}>Quick Links</span>
      <p className={styles.subTitle}>Here are the links from the web part's properties in the designated sort order.</p>
      <div className={styles.subTitle} dangerouslySetInnerHTML={{ __html: quickLinksMarkup }}></div>      
    </div>
  </div>
</div>
    </div >
  );
}
}
