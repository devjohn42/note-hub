import { Container, SimpleGrid } from '@chakra-ui/react';
import Header from './components/Header';
import Column from './components/Column';
import { ColumnType } from './utils/enums';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <>
      <Header />
      <Container maxWidth={{ base: '90%' }} px={4} py={10}>
        <DndProvider backend={HTML5Backend}>
          <SimpleGrid
            columns={{ base: 1, md: 2, xl: 5 }}
            spacing={{ base: 8, md: 6, xl: 3 }}
          >
            <Column column={ColumnType.TO_DO} />
            <Column column={ColumnType.IN_PROGRESS} />
            <Column column={ColumnType.PAUSED} />
            <Column column={ColumnType.COMPLETED} />
            <Column column={ColumnType.BLOCKED} />
          </SimpleGrid>
        </DndProvider>
      </Container>
    </>
  );
}

export default App;
