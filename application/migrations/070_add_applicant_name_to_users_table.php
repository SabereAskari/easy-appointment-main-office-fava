<?php defined('BASEPATH') or exit('No direct script access allowed');

class Migration_Add_applicant_name_to_users_table extends EA_Migration
{
    public function up(): void
    {
        if (!$this->db->field_exists('applicant_name', 'ea_users')) {
            $fields = [
                'applicant_name' => [
                    'type' => 'VARCHAR',
                    'constraint' => '255',
                    'null' => true,
                    'after' => 'last_name',
                ],
            ];
            $this->dbforge->add_column('ea_users', $fields);
        }

        $this->db->query('UPDATE ea_users SET applicant_name = CONCAT_WS(" ", NULLIF(first_name, ""), NULLIF(last_name, "")) WHERE applicant_name IS NULL OR applicant_name = ""');
    }

    public function down(): void
    {
        if ($this->db->field_exists('applicant_name', 'ea_users')) {
            $this->dbforge->drop_column('ea_users', 'applicant_name');
        }
    }
}
