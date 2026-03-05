import { useState } from 'react';

import { ServicenewDocument } from '@/prismicio-types';
import * as Select from '@radix-ui/react-select';
import styles from './Overlay.module.css';

import { asText } from '@prismicio/client';

import { useActiveServiceStore } from '@/stores/useActiveServiceStore';
import Arrow from '@/app/components/SvgComponents/Arrow/Arrow';
import { PrismicRichText } from '@prismicio/react';

type OverlayProps = {
  service: ServicenewDocument;
};

export default function Overlay({ service }: OverlayProps) {
  const {
    activeService,
    setActiveService,
    isContainerOpen,
    setIsContainerOpen
  } = useActiveServiceStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const displayedService = service.data.description_items.find(
    (item) => asText(item.item_title) === activeService
  );

  return (
    <div
      className={`${styles.overlay} ${isContainerOpen === service.id ? styles.open : ''}`}
    >
      <div className={styles.contentcontainer}>
        <div className={styles.dropdowncontainer}>
          <Select.Root
            key={activeService}
            open={isDropdownOpen}
            onOpenChange={setIsDropdownOpen}
            onValueChange={(value) => setActiveService(value)}
          >
            <Select.Trigger className={styles.select}>
              <Select.Value
                placeholder={`${asText(displayedService?.item_title)} `}
                className={styles.pickedValue}
              />
              <div
                className={`${styles.arrow} ${isDropdownOpen ? styles.dropdownopen : ''}`}
              >
                <Arrow height="15" />
              </div>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content position="popper" className={styles.dropdown}>
                <Select.Viewport>
                  {service.data.description_items
                    .filter(
                      (item) =>
                        asText(item.item_title) !==
                        asText(displayedService?.item_title)
                    )
                    .map((item, index) => (
                      <Select.Item
                        key={index}
                        value={asText(item.item_title) || `item-${index}`}
                        className={styles.option}
                      >
                        <Select.ItemText>
                          {asText(item.item_title)}
                        </Select.ItemText>
                      </Select.Item>
                    ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
        <div className={styles.textcontainer}>
          <PrismicRichText field={displayedService?.item} />
        </div>
      </div>

      <div onClick={() => setIsContainerOpen('')}>lcose</div>
    </div>
  );
}
