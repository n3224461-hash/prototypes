import { CabinetLayout } from '../../components/cabinet';

export default function Shablony() {
  return (
    <CabinetLayout
      showTopBar={true}
      showPageHeader={true}
      showFilterToolbar={true}
      pageHeaderProps={{
        title: 'Шаблоны',
        actionButtonText: 'Создать шаблон',
      }}
      contentAreaProps={{
        showPlaceholder: true,
        placeholderText: 'Список шаблонов будет отображаться здесь',
      }}
    />
  );
}
