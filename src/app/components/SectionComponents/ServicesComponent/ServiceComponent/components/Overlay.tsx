import { ServicenewDocument } from '@/prismicio-types';
import * as Select from '@radix-ui/react-select';
import styles from './Overlay.module.css';

import { asText } from '@prismicio/client';

import { useActiveServiceStore } from '@/stores/useActiveServiceStore';
import Arrow from '@/app/components/SvgComponents/Arrow/Arrow';

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

  const displayedService = service.data.description_items.find(
    (item) => asText(item.item_title) === activeService
  );

  return (
    <div
      className={`${styles.overlay} ${isContainerOpen === service.id ? styles.open : ''}`}
    >
      <Select.Root
        key={activeService}
        onValueChange={(value) => setActiveService(value)}
      >
        <Select.Trigger className={styles.select}>
          <Select.Value
            placeholder={`${asText(displayedService?.item_title)} `}
            className={styles.pickedValue}
          />
          <div className={styles.arrow}>
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
                    <Select.ItemText>{asText(item.item_title)}</Select.ItemText>
                  </Select.Item>
                ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <div>{asText(displayedService?.item)}</div>

      <div onClick={() => setIsContainerOpen('')}>lcose</div>
    </div>
  );
}
