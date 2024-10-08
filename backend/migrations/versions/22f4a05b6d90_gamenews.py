"""gameNews

Revision ID: 22f4a05b6d90
Revises: 4ea308944d64
Create Date: 2024-09-05 23:20:39.450341

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '22f4a05b6d90'
down_revision = '4ea308944d64'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('game_news', schema=None) as batch_op:
        batch_op.add_column(sa.Column('author', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('link', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('game_id', sa.String(), nullable=False))
        batch_op.create_foreign_key('fk_steam_games_id', 'steam_games', ['game_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('game_news', schema=None) as batch_op:
        batch_op.drop_constraint('fk_steam_games_id', type_='foreignkey')
        batch_op.drop_column('game_id')
        batch_op.drop_column('link')
        batch_op.drop_column('author')

    # ### end Alembic commands ###
